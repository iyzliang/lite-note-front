'use client';

import { useRouter } from 'next/navigation';
import '@/styles/not-found.scss';

export default function NotFound() {
  const router = useRouter();
  return (
    <section className="not-found-wrapper">
      <div className="container">
        <div id="scene" className="scene" data-hover-only="false">
          <div className="circle" data-depth="1.2"></div>

          <div className="one" data-depth="0.9">
            <div className="content">
              <span className="piece"></span>
              <span className="piece"></span>
              <span className="piece"></span>
            </div>
          </div>

          <div className="two" data-depth="0.60">
            <div className="content">
              <span className="piece"></span>
              <span className="piece"></span>
              <span className="piece"></span>
            </div>
          </div>

          <div className="three" data-depth="0.40">
            <div className="content">
              <span className="piece"></span>
              <span className="piece"></span>
              <span className="piece"></span>
            </div>
          </div>

          <p className="p404" data-depth="0.50">
            404
          </p>
          <p className="p404" data-depth="0.10">
            404
          </p>
        </div>

        <div className="text">
          <article>
            <p>
              看来你迷路了! <br />
              返回重新开始吧!
            </p>
            <button className="btn" onClick={() => router.back()}>
              返回
            </button>
          </article>
        </div>
      </div>
    </section>
  );
}
