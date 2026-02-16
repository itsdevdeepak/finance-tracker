import { useSearchParams } from "next/navigation";
import { decodeSearchParam } from "@/lib/utils/url";
import { categorySelectOptions, SortingSelectOptions } from "../constants";
import Search from "@/components/ui/form/Search";
import DropDown from "@/components/ui/form/DropDown";
import IconFilterMobile from "@/components/icons/IconFilterMobile";
import IconSortMobile from "@/components/icons/IconSortMobile";
import { URLParam } from "@/types";

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
        name="search-transaction"
        defaultValue={decodeSearchParam(searchParams.get("query") ?? "")}
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
        <DropDown
          label="Sort by"
          defaultValue={decodeSearchParam(searchParams.get("sort") ?? "")}
          options={SortingSelectOptions}
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
        <DropDown
          label="Category"
          defaultValue={decodeSearchParam(searchParams.get("category") ?? "")}
          options={categorySelectOptions}
          updateValue={(value) =>
            updateParam(
              [
                { name: "category", value },
                { name: "page", value: "1" },
              ],
              isFirstPage,
            )
          }
          MobileIcon={IconFilterMobile}
          inTransition={inTransition}
        />
      </div>
    </div>
  );
}
