// @ts-nocheck
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../states/store";
import { setSolvedData } from "../states/SolvedBoardData";
import {
  imageDataGetIt,
  setIsPending,
  solveCustomBoard,
} from "../states/solveCustomBoard";
import { generateEmptyBoard, solveSudoku } from "../utils/backTrackingAlgo";
import Tesseract from "tesseract.js";
// import { Cell } from "@types/cell";

const CustomSetting: React.FC = () => {
  // Redux state and dispatch
  const currentBoard = useSelector(
    (state: RootState) => state.setSolvedData.solvedBoardData
  );
  const dispatch = useDispatch();
  const boardSolved = useSelector(
    (state: RootState) => state.solveCustomBoard.isSolved
  );

  // Local state
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [processing, setProcessing] = useState<boolean>(false);
  const [visualize, setVisualize] = useState<boolean>(true);
  const imgRef = useRef<HTMLImageElement | null>(null);

  // * Image Upload Functionality
  const handleImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onload = async () => {
        const imageData = reader.result as string;
        setSelectedImage(imageData);
        await handleProcessImage();
        setProcessing(true);
      };
      reader.readAsDataURL(file);
    }
  };

  // Preprocess the uploaded image for OCR
  const preprocessImage = async (): Promise<void> => {
    if (imgRef.current && selectedImage) {
      setVisualize(false);
      dispatch(setIsPending(true));
      let img: cv.Mat | null = null;
      try {
        img = cv.imread(imgRef.current); // Load image into OpenCV
        cv.cvtColor(img, img, cv.COLOR_RGBA2GRAY, 0);
        cv.threshold(img, img, 150, 255, cv.THRESH_BINARY);
        // Calculate cell dimensions based on the image size
        const cellWidth = img.cols / 9;
        const cellHeight = img.rows / 9;
        const results: SudokuBoard = generateEmptyBoard(currentBoard);
        // Process cells in a nested loop
        for (let row = 0; row < 9; row++) {
          for (let col = 0; col < 9; col++) {
            const cellImg = img.roi(
              new cv.Rect(
                col * cellWidth,
                row * cellHeight,
                cellWidth,
                cellHeight
              )
            );
            const resizedCell = new cv.Mat();
            cv.resize(cellImg, resizedCell, new cv.Size(50, 50));

            const canvas = document.createElement("canvas");
            cv.imshow(canvas, resizedCell);
            cellImg.delete();
            resizedCell.delete();

            const blob: Blob | null = await new Promise((resolve) => {
              canvas.toBlob((b) => resolve(b), "image/png");
            });

            if (blob) {
              const {
                data: { text, confidence },
              } = await Tesseract.recognize(blob, "eng", {
                tessedit_char_whitelist: "0123456789",
                tessedit_pageseg_mode: Tesseract.PSM.SINGLE_CHAR,
              });

              results[row][col].value =
                confidence > 60 && text.trim() !== "" && !isNaN(parseInt(text))
                  ? parseInt(text)
                  : null;
            }
          }
        }
        console.log(results);
        dispatch(setSolvedData(results));
        setProcessing(false);
        dispatch(imageDataGetIt(true));
        img.delete();
      } catch (error) {
        console.error("Error during image processing:", error);
        if (img) img.delete(); // Ensure cleanup if error occurs
      } finally {
        dispatch(setIsPending(false));
      }
    }
  };

  // Solve Sudoku Function
  const solveManualSudoku = (): void => {
    const clonedBoard: SudokuBoard = JSON.parse(JSON.stringify(currentBoard));
    solveSudoku(clonedBoard);
    dispatch(setSolvedData(clonedBoard));
    dispatch(solveCustomBoard(true));
  };

  // Handle processing the image
  const handleProcessImage = async (): Promise<void> => {
    await preprocessImage();
  };

  return (
    <div className="custom-setting">
      <div className="img">
        <input
          type="file"
          id="customFileInput"
          style={{ display: "none" }}
          onChange={handleImageUpload}
          disabled={processing || boardSolved}
        />
        <label
          htmlFor="customFileInput"
          className={`customLabel ${
            boardSolved || processing ? "not-allowed" : ""
          }`}
        >
          Upload image
        </label>
        {selectedImage && (
          <img
            style={{ display: "none" }}
            src={selectedImage}
            ref={imgRef}
            width={300}
            height={300}
            alt="uploaded"
          />
        )}
      </div>

      <button
        className={`solve ${boardSolved || processing ? "not-allowed" : ""}`}
        onClick={solveManualSudoku}
        disabled={boardSolved || processing}
      >
        Solve
      </button>

      {selectedImage && !boardSolved && visualize && (
        <button
          className={`process-image-btn ${
            boardSolved || processing ? "not-allowed" : ""
          }`}
          onClick={handleProcessImage}
        >
          Visualize
        </button>
      )}
    </div>
  );
};

export default CustomSetting;
