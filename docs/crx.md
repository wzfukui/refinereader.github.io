创建自己的基于Linux的CRX托管方案涉及几个步骤。下面是一个简单的指南，帮助你生成CRX文件并进行托管：

### 1. 准备Chrome扩展

首先，确保你已经开发了一个Chrome扩展，并且它的文件结构如下：

```
my-extension/
├── manifest.json
├── background.js
├── content.js
└── popup.html
```

### 2. 创建CRX文件

要生成CRX文件，你需要使用Chrome的命令行工具。以下是步骤：

#### 2.1 安装依赖

确保你已经安装了`chromium`或`google-chrome`，并且在Linux上可以通过命令行访问。

#### 2.2 生成私钥

如果你还没有私钥，可以通过以下命令生成一个：

```bash
openssl genrsa -out refinereader.pem 2048

openssl rsa -in refinereader.pem -pubout -outform DER -out refinereader.pub

openssl base64 -in refinereader.pub -out refinereader.b64
```

#### 2.3 打包扩展

使用以下命令打包扩展：

```bash
chromium --pack-extension=refinereader --pack-extension-key=refinereader.pem
```

这将生成一个`my-extension.crx`文件。

### 3. 托管CRX文件

你可以通过多种方式托管CRX文件，以下是一些常见的选项：

#### 3.1 使用Web服务器

将生成的CRX文件上传到你的Web服务器，并确保可以通过HTTP/HTTPS访问。

#### 3.2 创建一个更新清单文件

为了让Chrome知道如何更新你的扩展，你需要创建一个`updates.xml`文件，内容如下：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<gupdate xmlns="http://www.google.com/update2/updates" protocol="2.0">
  <app appid="YOUR_EXTENSION_ID">
    <updatecheck codebase="http://yourserver.com/path/to/my-extension.crx" version="1.0.0"/>
  </app>
</gupdate>
```

将`YOUR_EXTENSION_ID`替换为你的扩展ID（可以在`manifest.json`中找到），并将`codebase`替换为CRX文件的URL。

#### 3.3 配置Web服务器

确保你的Web服务器配置正确，能够返回`updates.xml`文件。你可以将其放在根目录或特定路径下。

### 4. 安装扩展

用户可以通过以下步骤安装你的扩展：

1. 打开Chrome浏览器。
2. 访问`chrome://extensions/`。
3. 启用“开发者模式”。
4. 点击“加载已解压的扩展程序”，选择你的扩展文件夹，或者直接通过URL安装。

### 5. 更新扩展

用户在访问你的扩展时，Chrome会自动检查`updates.xml`文件，获取最新版本的CRX文件。

### 总结

通过以上步骤，你可以在Linux上创建和托管自己的Chrome扩展CRX文件。确保你遵循Chrome的开发者政策，并定期更新你的扩展。