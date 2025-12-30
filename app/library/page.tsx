'use client';

import { useState, useRef, useEffect } from 'react';
import { useInfiniteBooks } from '@/hooks/useInfiniteBooks';
import { BookCard } from '@/components/BookCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useDebounce } from 'use-debounce';
import { useVirtualizer } from '@tanstack/react-virtual';
import { Loader2 } from 'lucide-react';

const CHIPS = ["science", "mathematics", "history", "biology", "astronomy"];

export default function LibraryPage() {
  const [inputQuery, setInputQuery] = useState("science");
  const [debouncedQuery] = useDebounce(inputQuery, 400);

  // Default to "book" if query is empty to avoid API errors
  const activeQuery = debouncedQuery.trim() === "" ? "book" : debouncedQuery;

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteBooks(activeQuery);

  const allBooks = data ? data.pages.flatMap((page) => page.docs) : [];

  // --- Virtualization Logic ---
  const [columns, setColumns] = useState(1);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateColumns = () => {
      const width = window.innerWidth;
      if (width >= 1024) setColumns(4); 
      else if (width >= 768) setColumns(3); 
      else setColumns(2); 
    };
    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, []);

  const totalRows = Math.ceil(allBooks.length / columns);

  const rowVirtualizer = useVirtualizer({
    count: totalRows,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => 450, 
    overscan: 5,
    gap: 16, // Explicitly handle gap logic in virtualizer
  });

  useEffect(() => {
    const [lastItem] = [...rowVirtualizer.getVirtualItems()].reverse();
    
    if (!lastItem) return;

    if (
      lastItem.index >= totalRows - 1 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  }, [
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    totalRows,
    rowVirtualizer
  ]);

  return (
    <div 
      ref={scrollRef} 
      className="h-screen w-full overflow-y-auto bg-background text-foreground"
    >
      <div className="p-4 pb-20 max-w-7xl mx-auto"> 
        {/* Header & Search */}
        <div className="sticky top-0 z-10 bg-background/95 backdrop-blur py-4 space-y-4 border-b mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Edzy Library</h1>
          
          <div className="flex flex-col gap-4 max-w-2xl">
            <Input 
              placeholder="Search for books..." 
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              className="w-full"
            />
            
            <div className="flex gap-2 overflow-x-auto pb-2">
              {CHIPS.map((chip) => (
                <Button
                  key={chip}
                  variant={inputQuery === chip ? "default" : "outline"}
                  size="sm"
                  onClick={() => setInputQuery(chip)}
                  className="capitalize"
                >
                  {chip}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Virtualized Grid */}
        <div>
          {status === 'pending' ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="h-100 bg-muted animate-pulse rounded-xl" />
              ))}
            </div>
          ) : status === 'error' ? (
            <div className="text-red-500">Error fetching books.</div>
          ) : (
            <div
              style={{
                height: `${rowVirtualizer.getTotalSize()}px`,
                width: '100%',
                position: 'relative',
              }}
            >
              {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                const startIndex = virtualRow.index * columns;
                const rowBooks = allBooks.slice(startIndex, startIndex + columns);

                return (
                  <div
                    key={virtualRow.index}
                    data-index={virtualRow.index} 
                    ref={rowVirtualizer.measureElement} // FIX: Attach measure ref
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      transform: `translateY(${virtualRow.start}px)`,
                    }}
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-2"
                  >
                    {rowBooks.map((book) => (
                      <BookCard key={book.key} book={book} />
                    ))}
                  </div>
                );
              })}
            </div>
          )}
          
          {isFetchingNextPage && (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}