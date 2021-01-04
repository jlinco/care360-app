import React from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import style from './style.module.scss'

const mapStateToProps = ({ settings }) => ({ settings })

const Footer = ({ settings: { isContentMaxWidth } }) => {
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
              <strong>Care360 - The next big thing in digital medical care!</strong>
            </p>
            <p>
              Care360 is a medical service application aimed at making your medical experience
              seamless. We will take you through the process of registering your patient and
              tracking their medical progress over time within the application.
            </p>
            <a
              href="https://sellpixels.com"
              target="_blank"
              rel="noopener noreferrer"
              className={style.sellpixels}
            >
              CARE360
              <span />
            </a>
            <br />
            <p className="mb-0">
              Copyright © 2020-{new Date().getFullYear()} StrixusApps |{' '}
              <a href="https://strixusapps.com" target="_blank" rel="noopener noreferrer">
                Privacy Policy
              </a>
            </p>
          </div>
          <div className="col-md-4">
            <div className={style.logo}>
              <div className={style.logo__letter}>C</div>
              <div className={style.logo__name}>CARE360</div>
              <div className={style.logo__descr}>ADMIN CONSOLE</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default connect(mapStateToProps)(Footer)
