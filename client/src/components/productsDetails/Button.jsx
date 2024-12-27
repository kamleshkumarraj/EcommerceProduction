function Button({label ,bgColor , color}) {
    return (
      <div id='button' className={`px-[20px] grid place-content-center py-[10px] rounded-[1rem] text-[18px] font-[600] hover:cursor-pointer max-w-[220px] ${bgColor} ${color}`} >
        <p className="text-[white]">{label}</p>
      </div>
    )
  }
  
  export default Button