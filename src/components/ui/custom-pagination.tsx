import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { Input } from "./input";
import { useDebouncing } from "@/hooks/use-debouncing";
import { useState } from "react";

type PaginationProps = {
  totalPages: number;
  currentPage?: number;
  totalItems: number;
  disabled?: boolean;
};

export function CustomPagination({ totalPages, currentPage = 1, totalItems, disabled }: PaginationProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [pageInput, setPageInput] = useState<string>(String(currentPage));

  const handlePageChange = (page: number) => {
    searchParams.set("page", page.toString());
    setPageInput(String(page));
    setSearchParams(searchParams);
  };

  const handleChoicePage = useDebouncing(handlePageChange, 1000);

  return (
    <div className="flex items-center justify-between px-2">
      <div className="flex-1 text-sm text-muted-foreground">
        {totalItems} item(s) total
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {currentPage} of {totalPages}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1 || disabled}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1 || disabled}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Input value={pageInput} type="number" max={totalPages} onChange={(e) => {
            const value = Math.min(Number(e.target.value), totalPages);
            setPageInput(String(value))
            handleChoicePage(value)}} className="h-8 w-8 p-0 text-center bg-muted" />
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages || disabled}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages || disabled}
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}



// import React from "react";
// import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
// import { useSearchParams } from "react-router-dom";
// import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

// type PaginationProps = {
//   totalPages: number;
//   currentPage?: number;
// };

// export function CustomPagination({ totalPages, currentPage = 1 }: PaginationProps) {
//   console.log("total pages", totalPages);
//   const [searchParams, setSearchParams] = useSearchParams();

//   const handleClick = (page: number) => {
//     searchParams.set("page", page.toString());
//     setSearchParams(searchParams);
//   };

//   return (
//     <Pagination>
//       <PaginationContent className="flex items-center">
//         <div className="hidden sm:flex">
//           <PaginationItem>
//             <PaginationPrevious onClick={() => handleClick(Math.max(1, currentPage - 1))} />
//           </PaginationItem>
//           {currentPage > 1 && (
//             <PaginationItem>
//               <PaginationLink onClick={() => handleClick(1)}>1</PaginationLink>
//             </PaginationItem>
//           )}
//           {currentPage > 3 && <PaginationItem>...</PaginationItem>}
//           {currentPage > 2 && (
//             <PaginationItem>
//               <PaginationLink onClick={() => handleClick(currentPage - 1)}>{currentPage - 1}</PaginationLink>
//             </PaginationItem>
//           )}
//           <PaginationItem>
//             <PaginationLink isActive>{currentPage}</PaginationLink>
//           </PaginationItem>
//           {currentPage < totalPages - 1 && (
//             <PaginationItem>
//               <PaginationLink onClick={() => handleClick(currentPage + 1)}>{currentPage + 1}</PaginationLink>
//             </PaginationItem>
//           )}
//           {currentPage < totalPages - 2 && <PaginationItem>...</PaginationItem>}
//           {currentPage < totalPages && (
//             <PaginationItem>
//               <PaginationLink onClick={() => handleClick(totalPages)}>{totalPages}</PaginationLink>
//             </PaginationItem>
//           )}
//           <PaginationItem>
//             <PaginationNext onClick={() => handleClick(Math.min(totalPages, currentPage + 1))} />
//           </PaginationItem>
//         </div>
//         <div className="flex sm:hidden items-center space-x-2">
//           <PaginationItem>
//             <PaginationLink onClick={() => handleClick(1)} className="h-8 w-8 p-0">
//               <span className="sr-only">First page</span>
//               <ChevronsLeft className="h-4 w-4" />
//             </PaginationLink>
//           </PaginationItem>
//           <PaginationItem>
//             <PaginationLink
//               onClick={() => handleClick(Math.max(1, currentPage - 1))}
//               className="h-8 w-8 p-0"
//             >
//               <span className="sr-only">Previous page</span>
//               <ChevronLeft className="h-4 w-4" />
//             </PaginationLink>
//           </PaginationItem>
//           <span className="text-sm">
//             {currentPage}/{totalPages}
//           </span>
//           <PaginationItem>
//             <PaginationLink
//               onClick={() => handleClick(Math.min(totalPages, currentPage + 1))}
//               className="h-8 w-8 p-0"
//             >
//               <span className="sr-only">Next page</span>
//               <ChevronRight className="h-4 w-4" />
//             </PaginationLink>
//           </PaginationItem>
//           <PaginationItem>
//             <PaginationLink onClick={() => handleClick(totalPages)} className="h-8 w-8 p-0">
//               <span className="sr-only">Last page</span>
//               <ChevronsRight className="h-4 w-4" />
//             </PaginationLink>
//           </PaginationItem>
//         </div>
//       </PaginationContent>
//     </Pagination>
//   );
// }


