async function get (ctx,next) {
    ctx.body="这里是商品首页"
    // ctx.response.message ="这里是商品首页"
}

async function post(ctx, next) {
    ctx.body = "hello mall post"
}

module.exports={
    get,
    post
}