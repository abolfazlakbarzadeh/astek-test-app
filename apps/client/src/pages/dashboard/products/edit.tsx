import {useQuery} from "@tanstack/react-query";
import {useParams} from "react-router";
import {useEffect} from "react";
import {LoadingOverlay} from "@/components/loading-overlay.tsx";
import {ProductsService} from "@/services/products-service.ts";
import {ProductForm} from "@/pages/dashboard/products/form.tsx";

export const EditProductPage = () => {
    const params = useParams()
    const productQuery = useQuery({
        queryKey: ['products', 'product'],
        queryFn: () => {
            return ProductsService.get(Number(params.id))
        },
        enabled: false,
        staleTime: 0,
        retry: 0
    })

    useEffect(() => {
        if (params.id)
            productQuery.refetch()
    }, [params.id, params]);

    return productQuery.isLoading || !productQuery.data ? <LoadingOverlay/> : (
        <ProductForm key={productQuery.data.data!.id} data={productQuery.data!.data} edit/>
    )
}
