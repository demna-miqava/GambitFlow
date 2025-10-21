import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface FriendsLocalSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const FriendsLocalSearch = ({
  value,
  onChange,
  placeholder = "Search friends...",
}: FriendsLocalSearchProps) => {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-9"
      />
    </div>
  );
};
