from flask import Flask, request, jsonify
import os

app = Flask(__name__)

# 设置上传文件夹
UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# 确保上传文件夹存在
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route('/api/messages', methods=['POST'])
def add_message():
    # 从表单中获取数据
    name = request.form.get('name')
    content = request.form.get('content')
    photo = request.files.get('photo')

    # 检查必填字段是否存在
    if not name or not content:
        return jsonify({'error': '请填写所有必填字段'}), 400

    # 保存文件
    photo_filename = None
    if photo:
        photo_filename = os.path.join(app.config['UPLOAD_FOLDER'], photo.filename)
        photo.save(photo_filename)

    # 模拟保存留言（这里你可以将留言保存到数据库或其他存储中）
    # save_message(name, content, photo_filename)

    return jsonify({'message': '留言提交成功'}), 200

@app.route('/')
def index():
    return "欢迎来到祥安生命有限公司的API接口"

if __name__ == '__main__':
    app.run(debug=True)
