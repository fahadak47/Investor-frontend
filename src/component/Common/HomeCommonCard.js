import React from 'react'

export default function ({img,title,desc,backgroundColor}) {
  return (
    <>

     <div class="card h-100" style={{background:backgroundColor}}>
                        <img src={img} />
                        <h5>{title}</h5>
                        <p>{desc}</p>
                    </div>

    
    </>
  )
}

{/* <div class="col-sm-12 col-lg-6">
  <div class="card h-100"></div> */}