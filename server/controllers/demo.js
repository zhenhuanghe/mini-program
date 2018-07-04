async function get(ctx, next) {
    // const { signature, timestamp, nonce, echostr } = ctx.query
    // if (checkSignature(signature, timestamp, nonce)) ctx.body = echostr
    // else ctx.body = 'ERR_WHEN_CHECK_SIGNATURE'
    ctx.state.data = {
        message: 'hello demo'
    }
}

module.exports = async (ctx)=>{
    ctx.state.data = {
        message:'hello demo'
    }
} 
module.exports ={
     get   
}