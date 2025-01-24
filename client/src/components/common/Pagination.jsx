function Pagination({pageData , selectIdx , setSelectIdx , startIdx , endIdx , setStartIdx , setEndIdx , startPageIdx , endPageIdx , setStartPageIdx , setEndPageIdx , perPageData}) {
  return (
    <div>
    { pageData.totalPage > 1 && <div id="pagination" className="flex flex-wrap gap-[10px] justify-end mx-[4rem] my-[1rem]">
        <div id="prev">
          <p onClick={() => {
            if(selectIdx > 1){
              setStartIdx(startIdx - perPageData)
              setEndIdx(endIdx - perPageData)
              setSelectIdx(selectIdx - 1)
              if(pageData.totalPage > 7){
                if(selectIdx > 4 && selectIdx < pageData.totalPage - 2) {
                  setStartPageIdx(selectIdx - 5)
                  setEndPageIdx(selectIdx + 2)
                }
              }
              
            }
          }}  className={`px-[2rem] py-[1rem]  border-gray-400 border-[1px] mx-[.5rem] rounded-[6px] bg-black text-white font-[500] text-[1.6rem] ${selectIdx == 1 ? 'hover:cursor-not-allowed opacity-40' : 'cursor-pointer opacity-100'}`} >Prev</p>
        </div>
        {pageData.totalPage > 1 &&
          [...Array(pageData.totalPage).keys()].slice(startPageIdx , endPageIdx).map((item) => (
            <span
              onClick={() => {
                 setStartIdx(item * perPageData) 
                 setEndIdx((item + 1) * perPageData)
                 setSelectIdx(item + 1)
                 if(pageData.totalPage > 7){
                  if(item + 1 > 3 && item + 1 < pageData.totalPage - 3) {
                    setStartPageIdx(item -3)
                    setEndPageIdx(item + 4)
                   }else if(item + 1 < 3){
                    setStartPageIdx(0)
                    setEndPageIdx(7)
                   }else if(item + 1 > pageData.totalPage - 4){
                    setStartPageIdx(pageData.totalPage - 7)
                    setEndPageIdx(pageData.totalPage)
                   }
                 }
                 
              }}
              key={item}
              className={`${
                item*perPageData == startIdx ? "bg-[#7fad39] text-white" : ""
              } px-[2rem] py-[1rem] cursor-pointer border-gray-400 border-[1px] mx-[.5rem] rounded-[4px] text-[1.6rem]`}
            >
              {item + 1}
            </span>
          ))}
          <div id="next">
          <p onClick={() => {
            if(selectIdx < pageData.totalPage){
              setStartIdx(startIdx + 9)
              setEndIdx(endIdx + 9)
              setSelectIdx(selectIdx + 1)
              if(pageData.totalPage > 7){
              if(selectIdx > 3 && selectIdx < pageData.totalPage - 3) {
                setStartPageIdx(selectIdx - 3)
                setEndPageIdx(selectIdx + 4)
              }
        }
          }}}  className={`px-[2rem] py-[1rem] cursor-pointer border-gray-400 border-[1px] mx-[.5rem] rounded-[6px] text-[1.6rem] bg-black ${selectIdx == pageData.totalPage ? 'hover:cursor-not-allowed opacity-40' : 'cursor-pointer opacity-100'} text-white font-[500] text-center`} >Next</p>
        </div>
      </div>}
    </div>
  )
}

export default Pagination
