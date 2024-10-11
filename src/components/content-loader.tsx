// import React from 'react';
// import { Loader } from '@/components/ui/loader';
// import SimuladoCardLoading from './simulado-card-loader';

// interface Props {
//     loading: boolean;
//     error: Error | null;
//     noContent: string | React.ReactNode;
//     children?: React.ReactNode;
// }

// const ContentLoader: React.FC<Props> = ({ loading, error, noContent, children }) => {
//     if (loading) {
//         return (
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
//                 {
//                   Array.from(Array(15)).map((_, index) => <SimuladoCardLoading key={index} />)
//                 }
//                 </div>
//         );
//     }

//     if (error) {
//         return (
//             <div className="text-center text-red-500">
//                 {error.message}
//             </div>
//         );
//     }

//     if (!children) {
//         return (
//             <div className="text-center text-gray-500">
//                 {noContent}
//             </div>
//         );
//     }

//     return <>{children}</>;
// };

// export default ContentLoader;

import React from 'react';
import { Loader } from '@/components/ui/loader';

interface Props {
    loading: boolean;
    error: Error | null;
    noContent: string | React.ReactNode;
    loadingComponent?: React.ReactNode; // Componente de loading opcional
    repeat?: number; // Número de vezes que o loadingComponent será repetido
    children?: React.ReactNode;
}

const ContentLoader: React.FC<Props> = ({ 
    loading, 
    error, 
    noContent, 
    loadingComponent, 
    repeat, 
    children 
}) => {

    if (loading) {
        if (loadingComponent && repeat) {
            return (
                <>
                    {Array.from({ length: repeat }).map((_, index) => (
                        <div key={index} className="m-2">
                            {loadingComponent}
                        </div>
                    ))}
                </>
            );
        }

        // Se `loadingComponent` for passado mas `repeat` não
        if (loadingComponent) {
            return (
                <>
                    {loadingComponent}
                </>
            );
        }

        // Loading padrão (se nenhum `loadingComponent` for passado)
        return (
            <Loader/>
        );
    }

    if (error) {
        return (
            <div className="text-center text-red-500">
                {error.message}
            </div>
        );
    }

    if (!children) {
        return (
            <div className="text-center">
                {noContent}
            </div>
        );
    }

    return <>{children}</>;
};

export default ContentLoader;