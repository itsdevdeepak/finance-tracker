import { useSearchParams } from "next/navigation";
import { SORT_OPTIONS } from "../constants";
import IconSortMobile from "@/components/icons/IconSortMobile";
import Search from "@/components/ui/form/Search";
import { URLParam } from "@/types";
import Dropdown from "@/components/ui/Dropdown";

export default function DataControls({
  updateParam,
  inTransition = false,
}: {
  updateParam: (param: URLParam | URLParam[], replace?: boolean) => void;
  inTransition?: boolean;
}) {
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") ?? "");
  const isFirstPage = !Number.isNaN(currentPage) ? currentPage <= 1 : true;

  return (
    <div className="flex justify-between gap-xl">
      <Search
        name="search-recurring-bills"
        defaultValue={searchParams.get("query") ?? ""}
        placeholder="Search Transaction"
        inTransition={inTransition}
        updateQuery={(value) =>
          updateParam(
            [
              { name: "query", value },
              { name: "page", value: "1" },
            ],
            false,
          )
        }
      />
      <div className="flex gap-sm lg:gap-lg">
        <Dropdown
          label="Sort by"
          defaultValue={searchParams.get("sort") ?? ""}
          options={SORT_OPTIONS}
          updateValue={(value) =>
            updateParam(
              [
                { name: "sort", value },
                { name: "page", value: "1" },
              ],
              isFirstPage,
            )
          }
          MobileIcon={IconSortMobile}
          inTransition={inTransition}
        />
      </div>
    </div>
  );
}
