import { useSearchParams } from "next/navigation";
import { URLParam } from "../types";
import { decodeSearchParam } from "@/lib/utils/url";
import { categorySelectOptions, SortingSelectOptions } from "../constants";
import Search from "@/components/ui/form/Search";
import DropDown from "@/components/ui/form/DropDown";
import IconFilterMobile from "@/components/icons/IconFilterMobile";
import IconSortMobile from "@/components/icons/IconSortMobile";

export default function DataControls({
  updateUrl,
  inTransition = false,
}: {
  updateUrl: (param: URLParam | URLParam[], replace?: boolean) => void;
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
          updateUrl(
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
            updateUrl(
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
            updateUrl(
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
