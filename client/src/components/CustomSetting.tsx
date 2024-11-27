// @ts-nocheck
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../states/store";
import { setSolvedData, solvedData } from "../states/SolvedBoardData";
import {
  imageDataGetIt,
  setIsPending,
  solveCustomBoard,
} from "../states/solveCustomBoard";
import { generateEmptyBoard, solveSudoku } from "../utils/backTrackingAlgo";
import Tesseract from "tesseract.js";
import { Cell } from "@types/cell";

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
  const [sudokuArray, setSudokuArray] = useState<Cell[][]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<string>("");
  const imgRef = useRef<HTMLImageElement | null>(null);

  // * Image Upload Functionality
  const handleImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const imageData = reader.result as string;
        setSelectedImage(imageData);
        handleProcessImage(imageData);
      };
      reader.readAsDataURL(file);
      handleProcessImage();
    }
  };

  // Preprocess the uploaded image for OCR
  const preprocessImage = async (): Promise<void> => {
    if (imgRef.current && selectedImage) {
      dispatch(setIsPending(true));
      setCurrentStep("Starting image processing with OpenCV...");
      let img: cv.Mat | null = null;
      try {
        img = cv.imread(imgRef.current); // Load image into OpenCV
        setCurrentStep("Image loaded into OpenCV.");

        cv.cvtColor(img, img, cv.COLOR_RGBA2GRAY, 0);
        cv.threshold(img, img, 150, 255, cv.THRESH_BINARY);
        setCurrentStep(
          "Image preprocessing done (grayscale and thresholding)."
        );

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
            setCurrentStep(`Cell [${row},${col}] processed...`);

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
        setSudokuArray(results);
        dispatch(imageDataGetIt(true));
        dispatch(setSolvedData(results));
        img.delete();
      } catch (error) {
        console.error("Error during image processing:", error);
        if (img) img.delete(); // Ensure cleanup if error occurs
      } finally {
        dispatch(setIsPending(false));
      }
    } else {
      setCurrentStep("Image not ready for processing.");
    }
  };

  // Solve Sudoku Function
  const solveManualSudoku = (): void => {
    const clonedBoard: SudokuBoard = JSON.parse(JSON.stringify(currentBoard));
    solveSudoku(clonedBoard);
    dispatch(setSolvedData(clonedBoard));
    dispatch(solveCustomBoard(true));
    // dispatch(imageDataGetIt(false));
  };

  // Handle processing the image
  const handleProcessImage = async (): Promise<void> => {
    setSudokuArray([]);
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
          disabled={!imageDataGetIt ? true : false}
        />
        <label
          htmlFor="customFileInput"
          className={`customLabel ${!imageDataGetIt ? "not-allowed" : ""}`}
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
        className={`solve ${boardSolved ? "not-active" : ""}`}
        onClick={solveManualSudoku}
        disabled={boardSolved}
      >
        Solve
      </button>

      {selectedImage && !boardSolved && (
        <button
          className="process-image-btn"
          onClick={handleProcessImage}
          disabled={loading}
        ></button>
      )}
    </div>
  );
};

export default CustomSetting;
