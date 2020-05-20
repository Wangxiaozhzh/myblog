const router = require('koa-router')()
const multer = require('koa-multer')
const { join } = require('path')

const storage = multer.diskStorage({
    // 存储的位置
    destination: join(process.cwd(), "upload"),
    // 文件名
    filename(req, file, cb){
      const filename = file.originalname.split(".")
      cb(null, `${Date.now()}.${filename[filename.length - 1]}`)
    }
  })
  const upload = multer({storage});
  
//   上传头像
  router.post('/uploadAvator', upload.single('file'), async ctx => {
      try {
        ctx.body = {
            code:200,
            filename: ctx.req.file.filename
          }
          
      } catch (error) {
          ctx.body={
             code:500,
             message:error 
          }
      }

  })

module.exports = router