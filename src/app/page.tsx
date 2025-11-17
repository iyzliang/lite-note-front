export default function Home() {
  return (
    <div className="container-custom py-12">
      <header className="mb-12 text-center">
        <h1 className="mb-4">欢迎来到我的博客</h1>
        <p className="text-lg text-secondary-600">
          使用 Next.js + TypeScript + Tailwind CSS v4 构建
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* 示例卡片 */}
        <div className="card">
          <h3 className="mb-2">文章标题 1</h3>
          <p className="mb-4 text-secondary-600">
            这是文章的简短描述，介绍文章的主要内容...
          </p>
          <div className="flex gap-2">
            <span className="badge badge-primary">技术</span>
            <span className="badge badge-secondary">前端</span>
          </div>
        </div>

        <div className="card">
          <h3 className="mb-2">文章标题 2</h3>
          <p className="mb-4 text-secondary-600">
            这是文章的简短描述，介绍文章的主要内容...
          </p>
          <div className="flex gap-2">
            <span className="badge badge-primary">设计</span>
            <span className="badge badge-accent">UI/UX</span>
          </div>
        </div>

        <div className="card">
          <h3 className="mb-2">文章标题 3</h3>
          <p className="mb-4 text-secondary-600">
            这是文章的简短描述，介绍文章的主要内容...
          </p>
          <div className="flex gap-2">
            <span className="badge badge-secondary">教程</span>
          </div>
        </div>
      </div>

      <div className="mt-12 text-center">
        <button className="btn btn-primary">查看更多文章</button>
      </div>
    </div>
  )
}
