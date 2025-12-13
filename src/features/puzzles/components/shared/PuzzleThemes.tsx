interface PuzzleThemesProps {
  themes?: string[];
}

export const PuzzleThemes = ({ themes }: PuzzleThemesProps) => {
  if (!themes?.length) return null;

  return (
    <div className="flex flex-wrap gap-1 pt-2">
      {themes.map((theme) => (
        <span
          key={theme}
          className="px-2 py-0.5 rounded-full bg-secondary text-[10px] text-secondary-foreground font-medium uppercase tracking-wider"
        >
          {theme}
        </span>
      ))}
    </div>
  );
};
