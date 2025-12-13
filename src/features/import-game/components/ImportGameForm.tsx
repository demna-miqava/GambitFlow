import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { usePgnInput } from "../hooks/usePgnInput";

interface ImportGameFormProps {
  onLoadPgn: (pgn: string) => void;
}

export const ImportGameForm = ({ onLoadPgn }: ImportGameFormProps) => {
  const { pgnInput, error, handleInputChange, handleLoadPgn, handleClear } =
    usePgnInput({ onLoadPgn });

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-border/60 bg-card p-4 flex-1">
      <div className="space-y-2">
        <Label htmlFor="pgn-input">Paste PGN</Label>
        <Textarea
          id="pgn-input"
          placeholder="Paste your PGN here..."
          value={pgnInput}
          onChange={(e) => handleInputChange(e.target.value)}
          className="min-h-[200px] font-mono text-sm"
        />
        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>
      <div className="flex gap-2">
        <Button onClick={handleLoadPgn} className="flex-1">
          Load Game
        </Button>
        <Button variant="outline" onClick={handleClear}>
          Clear
        </Button>
      </div>
    </div>
  );
};
