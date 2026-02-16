import { useTransition } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { URLParam } from "@/types";
import { createQueryString } from "@/lib/utils/url";

export default function useUpdateParam() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  function updateParam(params: URLParam | URLParam[], replace = false) {
    const navigate = replace ? router.replace : router.push;

    const queryString = createQueryString(
      searchParams,
      Array.isArray(params) ? params : [params],
    );

    if (queryString === searchParams.toString()) return;

    startTransition(() => {
      navigate(`${pathname}?${queryString}`, { scroll: false });
    });
  }

  return { isPending, updateParam };
}
