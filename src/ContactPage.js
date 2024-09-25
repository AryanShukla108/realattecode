import React from 'react'

const ContactPage = () => {
    return (
        <div className='ContactPage'>
            <div>
                <div className='touch'>GET IN TOUCH</div>
                <div className="para">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit ducimus amet eaque odio voluptates laudantium fugit beatae ea, quisquam cumque inventore est accusamus officiis rerum, soluta quam. Voluptatum, reiciendis. Inventore, exercitationem? Laudantium placeat sequi cupiditate, cum qui error voluptatem, consequatur voluptates consequuntur ex obcaecati laboriosam deleniti. Similique consequuntur error laboriosam!</div>
            </div>

            <form action="">
                <div className='form-page'>
                    <div className='c-form'>contact form</div>
                    <div className='inpppppp'>
                        <div className='put'>
                            <label htmlFor="">Name <span className='star'>*</span></label>
                            <input type="text" name="" id="" />
                        </div>
                        <div className='put'>
                            <label htmlFor="">Email Address <span className='star'>*</span></label>
                            <input type="text" name="" id="" />
                        </div>
                    </div>
                    <div className='puts'>
                        <label htmlFor="">Message <span className='star'>*</span></label>
                        <input type="text" name="" id="" />
                    </div>

                    <div className='form-send'><button className='clear'>send</button></div>
                </div>
            </form>
        </div>
    )
}

export default ContactPage