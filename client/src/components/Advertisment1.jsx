import avder_img from '../../src/assets/Img/paralax-img-1.webp'
function Advertisment1() {
  return (
    <div id='advertisment-setion' className='relative w-full h-[500px]' style={{
        backgroundImage : `url(${avder_img})`,
        backgroundRepeat : 'no-repeat',
        backgroundSize : 'cover'
    }}>

        <div id="details-section">
            <div id="sub-heading">
                <h2 className='text-[26px] text-white font-[Lora]'>Connect to Basel & Co.</h2>
            </div>
        </div>
      
    </div>
  )
}

export default Advertisment1
