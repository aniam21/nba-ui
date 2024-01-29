import { useState } from 'react';
import Wheel from '@uiw/react-color-wheel';
import { ColorResult, hsvaToHex } from '@uiw/color-convert';

interface ColorPickerProps {
  handleChange: (color: string) => void;
  id: string;
}
const ColorPicker = ({ handleChange, id }: ColorPickerProps) => {
  const [hsva, setHsva] = useState({ h: 214, s: 43, v: 90, a: 1 });
  const handleColorChange = (color: ColorResult) => {
    const hexColor = hsvaToHex(color.hsva);
    setHsva({ ...hsva, ...color.hsva });
    handleChange(hexColor);
  };

  return <Wheel id={id} width={25} height={25} color={hsva} onChange={(color) => handleColorChange(color)} />;
};

export default ColorPicker;
