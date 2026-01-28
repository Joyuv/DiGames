interface MenuProps {
  extraClassNames?: string;
}

export default function Menu({ extraClassNames }: MenuProps) {
  return(
    <div className={`flex flex-col gap-1.5 w-6.5 h-8 justify-center transition-[width] duration-300 ${extraClassNames}`}>
      <div className="h-0.75 rounded bg-current"></div>
      <div className="h-0.75 rounded bg-current"></div>
      <div className="h-0.75 rounded bg-current"></div>
    </div>
  );
}