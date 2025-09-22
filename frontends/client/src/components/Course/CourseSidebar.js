import Courses from "@/data/courses.json";
import { useEffect, useState } from 'react';
import api from "/src/route/route"
import { setFilterData } from '@/redux/filter/actionCreator';
import { useSelector, useDispatch } from 'react-redux';

export default function CourseSidebar() {
	const [filters, setFilters] = useState({
	  search: "",
		category: "",
	  aim: "",
	});
	const [FilterData,SetFilterData] = useState([{
		type: "name",
		placeholder: "Tìm khóa học",
		title: "Tìm kiếm"
	}])
	const [filteredCourses, setFilteredCourses] = useState(Courses);
	const dispatch = useDispatch();
	const a = useSelector(state => state.filter);

	useEffect(() => {
		dispatch(setFilterData(a));
	}, [filters]);
	const handleFilterChange = (e, filterType) => {
		const { id, checked } = e.target;
		setFilters((prevFilters) => ({
			...prevFilters,
			[filterType]: checked ? id : ""
		}));
		const elements = document.querySelectorAll('input[type="checkbox"]');
		for (const element of elements) {
			if (element.getAttribute("id")!=id && element.getAttribute("class")===filterType) {
				element.checked = false;
			}
		}
	};

	const handleSearchChange = (e) => {
	  setFilters((prevFilters) => ({
		...prevFilters,
		search: e.target.value
	  }));
	};
  
	const clearFilters = () => {
	  setFilters({
		  search: "",
		  category: "",
		  aim: "",
	  });
	  	document.querySelectorAll('input[type="text"]').value = "";
		const elements = document.querySelectorAll('input[type="checkbox"]');
		for (const element of elements) {
			element.checked = false;
		}
	};
	useEffect(() => {
		api.getCategory().then((res) => {
			let a=[];
			for (const category of res.content) {
				a.push({
					id: category.id,
					label: category.name,
					count: 0,
				})
			}
			SetFilterData(prev => [...prev,{
				type: "checkbox",
				titles: "Danh mục",
				title: "category",
				items: a
			},{
				type: "checkbox",
				titles: "Mục Tiêu",
				title: "aim",
				items:[
					{ id: "0 - 450", label: "0 - 450", count: 0 },
					{ id: "450+", label: "450+", count: 0 },
					{ id: "700+", label: "700+", count: 0 },
					{ id: "master toeic", label: "master toeic", count: 0 },
					{ id: "0 - 5.5", label: "0 - 5.5", count: 0 },
					{ id: "5.5+", label: "5.5+", count: 0 },
					{ id: "6.5+", label: "6.5+", count: 0 },
					{ id: "7.5+", label: "7.5+", count: 0 },
				]
			}]);
		})
	}, []);
	useEffect(() => {
		dispatch(setFilterData(filters));
	}, [filters]);

	return (
	  <div className="rts-course-filter-area">
		{FilterData.map((filter) => (
		  <div key={filter.title} className="single-filter-left-wrapper">
			  {filter.title == "Tìm kiếm" ?
				  <h6 className="title">{filter.title}</h6>
				  :
				  <h6 className="title">{filter.titles}</h6>

			  }
			  {filter.type === 'name' ? (
				  <div className="search-filter filter-body">
				<div className="input-wrapper">
				  <input
					type="text"
					placeholder={filter.placeholder}
					value={filters.search}
					onChange={handleSearchChange}
				  />
				  <i className="fa-light fa-magnifying-glass"></i>
				</div>
			  </div>
			) : (
			  <div className="checkbox-filter filter-body">
				<div className="checkbox-wrapper">
				  {filter.items.map((item) => (
					<div key={item.id} className="single-checkbox-filter">
					  <div className="check-box">
						<input
							className={filter.title.toLowerCase()}
						  type="checkbox"
						  id={item.id}
						  checked={filters[filter.titles.toLowerCase()]?.includes(item.id)}
						  onChange={(e) => handleFilterChange(e, filter.title.toLowerCase())}
						/>
						<label htmlFor={item.id}>{item.label}</label>
						<br />
					  </div>
					  {/*<span className="number">({calculateCounts(filter.title.toLowerCase(), item.id)})</span>*/}
					</div>
				  ))}
				</div>
			  </div>
			)}
		  </div>
		))}
		<button onClick={clearFilters} className="rts-btn btn-border">
		  <i className="fa-regular fa-x"></i> Xóa bộ lọc
		</button>
	  </div>
	);
  }
