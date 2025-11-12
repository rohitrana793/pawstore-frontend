import { Button } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

export function CircularPagination({ page, setSearchParamas, totalPages }) {
  return (
    <div className="flex items-center gap-4 mb-5 justify-center">
      <Button
        variant="text"
        className="flex items-center gap-2 rounded-full"
        onClick={() => setSearchParamas({ page: page - 1 })}
        disabled={Number(page) === 1}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
      </Button>
      <div className="flex items-center gap-2">{page}</div>
      <Button
        variant="text"
        className="flex items-center gap-2 rounded-full"
        onClick={() => setSearchParamas({ page: page + 1 })}
        disabled={Number(page) === totalPages}
      >
        Next
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </Button>
    </div>
  );
}
