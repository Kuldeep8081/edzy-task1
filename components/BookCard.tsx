import { BookDoc } from '@/lib/openLibrary';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Book, Calendar } from 'lucide-react'; // Import icons for extra polish
import Image from 'next/image';

interface BookCardProps {
  book: BookDoc;
}

export function BookCard({ book }: BookCardProps) {
  const hasCover = !!book.cover_i;
  const coverUrl = hasCover
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
    : null;

  return (
    <Card className="h-full flex flex-col overflow-hidden group border-muted/60 bg-card hover:bg-accent/5 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      
      {/* Image Container: Aspect Ratio 2/3  */}
      <div className="relative w-full aspect-2/3 bg-muted overflow-hidden border-b border-border/50">
        {hasCover && coverUrl ? (
          <>
            <Image 
              src={coverUrl}
              alt={book.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
            />
            {/* Subtle gradient overlay at bottom of image for depth */}
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </>
        ) : (
          /* Bonus: Gradient Placeholder with Icon  */
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-linear-to-br from-muted/50 to-muted text-muted-foreground/50 p-6 text-center">
            <Book className="h-12 w-12 mb-2 opacity-50" />
            <span className="text-xs font-medium uppercase tracking-widest opacity-70">No Cover</span>
          </div>
        )}

        {/* Floating Year Badge (Moved over image for style) */}
        {book.first_publish_year && (
          <div className="absolute top-2 right-2 -translate-y-2.5 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
             <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm text-[10px] shadow-sm border-0 gap-1">
                <Calendar className="w-3 h-3" />
                {book.first_publish_year}
             </Badge>
          </div>
        )}
      </div>
      
      {/* Content Area */}
      <CardContent className="grow p-4 flex flex-col gap-2">
        {/* Title: clamped to 2 lines, bold  */}
        <h3 
            className="font-bold text-lg leading-tight line-clamp-2 tracking-tight group-hover:text-primary transition-colors" 
            title={book.title}
        >
          {book.title}
        </h3>

        {/* Author */}
        <p className="text-sm text-muted-foreground line-clamp-1">
          {book.author_name?.[0] || <span className="italic opacity-50">Unknown Author</span>}
        </p>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 mt-auto">
        <div className="flex flex-wrap gap-1.5 w-full">
          {book.subject?.slice(0, 3).map((sub) => (
            <Badge 
                key={sub} 
                variant="outline" 
                className="text-[10px] px-2 py-0.5 h-auto font-normal text-muted-foreground bg-muted/30 group-hover:border-primary/30 transition-colors"
            >
              {sub}
            </Badge>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
}