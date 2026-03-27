import { useSearchParams } from "next/navigation";
import { decodeSearchParam } from "@/lib/utils/url";
import { CategorySelectOptions, SortingSelectOptions } from "../constants";
import Search from "@/components/ui/form/Search";
import IconFilterMobile from "@/components/icons/IconFilterMobile";
import IconSortMobile from "@/components/icons/IconSortMobile";
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
				<Dropdown
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
				<Dropdown
					label="Category"
					defaultValue={decodeSearchParam(searchParams.get("category") ?? "")}
					options={CategorySelectOptions}
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
