"use client";
import { useEffect, useState } from "react";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Check, ChevronsUpDown, X } from "lucide-react";

export default function DigitalSignatureCanvas() {
  const [text, setText] = useState("");
  const [color, setColor] = useState("#1A1A1A");
  const [fontSize, setFontSize] = useState(20);
  const [font, setFont] = useState("Times New Roman");

  const fonts = [
    { name: "Roboto", class: "font-roboto", value: "Roboto" },
    { name: "Lobster", class: "font-lobster", value: "Lobster" },
    { name: "Poppins", class: "font-poppins", value: "Poppins" },
    {
      name: "Playfair Display",
      class: "font-playfair",
      value: "Playfair Display",
    },
    { name: "Montserrat", class: "font-montserrat", value: "Montserrat" },
    { name: "Courier Prime", class: "font-courier", value: "Courier Prime" },
  ];
  console.log(font, color, fontSize);

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
            <h2 className="">Display Area</h2>
            <p
              className="border-2 my-2 py-2 px-2 rounded-lg"
              style={{ color, fontSize: `${fontSize}px`, fontFamily: font }}
            >
              {text}
            </p>
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
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
