import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";

interface TextInputProps {
  control: Control<any>;
  name: string;
  label?: string;
  placeholder?: string;
  type?: string;
}

export function CustomTextInput({
  control,
  name,
  label,
  placeholder,
  type = "text",
}: TextInputProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Input {...field} type={type} placeholder={placeholder} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
