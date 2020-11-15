import React from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import style from './style.module.scss'

const mapStateToProps = ({ settings }) => ({ settings })

const Footer = ({ settings: { isContentMaxWidth, logo, description } }) => {
  return (
    <div
      className={classNames(style.footer, {
        [style.footerFullWidth]: !isContentMaxWidth,
      })}
    >
      <div className={style.inner}>
        <div className="row">
          <div className="col-md-8">
            <p>
              <strong>Air UI - best solution for your next big app!</strong>
            </p>
            <p>
              Air UI is a set of modern professional Html / React / Vue and Angular based templates.
              This is a powerful and super flexible tool, which suits best for any kind of web
              application: Web Sites, Web Applications, Hybrid Apps, CRM, CMS, Admin Panels, etc.
            </p>
            <a
              href="https://sellpixels.com"
              target="_blank"
              rel="noopener noreferrer"
              className={style.sellpixels}
            >
              SELLPIXELS
              <span />
            </a>
            <br />
            <p className="mb-0">
              Copyright © 2017-{new Date().getFullYear()} Mdtk Soft |{' '}
              <a href="https://www.mediatec.org/privacy" target="_blank" rel="noopener noreferrer">
                Privacy Policy
              </a>
            </p>
          </div>
          <div className="col-md-4">
            <div className={style.logo}>
              <div className={style.logo__letter}>A</div>
              <div className={style.logo__name}>{logo}</div>
              <div className={style.logo__descr}>{description}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default connect(mapStateToProps)(Footer)
