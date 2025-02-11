"use client";
import { useEffect, useState, useRef } from "react";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { X } from "lucide-react";

export default function DigitalSignatureCanvas() {
  const [text, setText] = useState("");
  const [color, setColor] = useState("#1A1A1A");
  const [fontSize, setFontSize] = useState(20);
  const [font, setFont] = useState("Times New Roman");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const fonts = [
    { name: "Roboto", value: "Roboto" },
    { name: "Lobster", value: "Lobster" },
    { name: "Poppins", value: "Poppins" },
    { name: "Playfair Display", value: "Playfair Display" },
    { name: "Montserrat", value: "Montserrat" },
    { name: "Courier Prime", value: "Courier Prime" },
  ];

  // Draw text on canvas whenever text, color, font, or fontSize changes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear previous drawings
        ctx.font = `${fontSize}px ${font}`;
        ctx.fillStyle = color;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(text, canvas.width / 2, canvas.height / 2);
      }
    }
  }, [text, color, fontSize, font]);

  const handleSaveSignature = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const dataUrl = canvas.toDataURL("image/png");
      console.log("Saved Signature Data URL:", dataUrl);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <AlertDialog>
        <AlertDialogTrigger className="flex justify-center bg-amber-500 p-3 rounded-lg hover:bg-amber-600">
          Add Digital Signature
        </AlertDialogTrigger>
        <AlertDialogContent>
          <div className="flex flex-col">
            <div className="flex justify-between">
              <h1>Enter Your Signature</h1>
              <AlertDialogCancel>
                <X />
              </AlertDialogCancel>
            </div>
            <input
              type="text"
              className="border-2 w-full text-xl px-2 my-2 rounded-md"
              placeholder="Type your signature"
              onChange={(e) => setText(e.target.value)}
            />
            <h2>Display Area</h2>
            <canvas
              ref={canvasRef}
              className="border-2 my-2 py-2 px-2 rounded-lg w-full h-32 bg-white"
              width={500}
              height={100}
            />
          </div>
          <div className="flex justify-between">
            <div>
              <h1 className="font-bold">Color</h1>
              <input
                className="border rounded-full"
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
            </div>
            <div>
              <h1>Font Style</h1>
              <div className="flex flex-col items-center">
                <Select onValueChange={(e) => setFont(e)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a Font" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {fonts.map((font) => (
                        <SelectItem key={font.name} value={font.value}>
                          {font.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <h1>Font Size</h1>
              <input
                type="range"
                min="30"
                max="60"
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
              />
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <button
              onClick={handleSaveSignature}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Save Signature
            </button>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
