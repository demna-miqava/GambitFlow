import { useState, useEffect } from "react";
import { useQueryParams } from "@/hooks/useQueryParams";
import { useDebounce } from "@/hooks/useDebounce";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export const FriendsSearch = () => {
  const { getParam, setParam, removeParam } = useQueryParams();
  const search = getParam("search") || "";
  const [inputValue, setInputValue] = useState(search);
  const debouncedValue = useDebounce(inputValue, 500);

  // Update URL param when debounced value changes
  useEffect(() => {
    if (debouncedValue.length === 0) {
      removeParam("search");
      setParam("page", 1);
    } else {
      setParam("search", debouncedValue);
    }
  }, [debouncedValue]);

  return (
    <div className="relative w-64">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Search friends..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="pl-9"
      />
    </div>
  );
};
