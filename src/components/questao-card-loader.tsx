import React from 'react'
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export const QuestionDisplaySkeleton: React.FC = () => {
  return (
    <Card className="w-full max-w-3xl">
      <div className="flex justify-between items-center p-6 border-b">
        <Skeleton className="h-8 w-40" />
        <div className="flex space-x-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-20" />
        </div>
      </div>
      <div className="p-6 space-y-4">
        <Skeleton className="h-6 w-3/4" />
        <div className="bg-muted p-4 rounded-md">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6 mt-2" />
          <Skeleton className="h-4 w-4/6 mt-2" />
        </div>
        <Skeleton className="h-5 w-1/2" />
        <div className="space-y-2">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Skeleton className="h-4 w-4 rounded-full" />
              <Skeleton className="h-4 w-full max-w-[300px]" />
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}