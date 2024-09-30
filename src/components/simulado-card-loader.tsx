import React from 'react';
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton" // Placeholder para carregar dados

const SimuladoCardLoading: React.FC = () => {
  return (
    <Card className="p-4 bg-background border border-muted rounded-lg hover:shadow-2xl cursor-pointer">
            <CardHeader>
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2 mt-2" />
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Skeleton className="w-5 h-5" />
                        <Skeleton className="h-4 w-24" />
                    </div>
                    <div className="flex items-center gap-2">
                        <Skeleton className="w-5 h-5" />
                        <Skeleton className="h-4 w-8" />
                    </div>
                </div>
            </CardContent>
        </Card>
  );
};

export default SimuladoCardLoading;
