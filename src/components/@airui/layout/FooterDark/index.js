import React from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import style from './style.module.scss'

const mapStateToProps = ({ settings }) => ({ settings })

const FooterDark = ({ settings: { isContentMaxWidth, logo, description } }) => {
  return (
    <div
      className={classNames(style.footerDark, {
        [style.footerFullWidth]: !isContentMaxWidth,
      })}
    >
      <div className={`${style.outer} py-5 text-gray-6`}>
        <div className={style.container}>
          <div className="row">
            <div className="col-md-6 col-lg-4">
              <h4 className="text-white font-weight-bold mb-4 mb-lg-5">Quick Links</h4>
              <div className="row">
                <div className="col-sm-6">
                  <div className="d-flex flex-column">
                    <a className="mb-1" href="#">
                      Documentation
                    </a>
                    <a className="mb-1" href="#">
                      Service Rules
                    </a>
                    <a className="mb-1" href="#">
                      User Settings
                    </a>
                    <a className="mb-1" href="#">
                      Dashboard Setings
                    </a>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="d-flex flex-column mb-4">
                    <a className="mb-1" href="#">
                      User Settings
                    </a>
                    <a className="mb-1" href="#">
                      Dashboard Settings
                    </a>
                    <a className="mb-1" href="#">
                      Documentation
                    </a>
                    <a className="mb-1" href="#">
                      Service Rules
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-12 col-lg-4">
              <h4 className="text-white font-weight-bold mb-4 mb-lg-5">About</h4>
              <p>
                Care360 is a medical service application aimed at making your medical experience
                seamless. We will take you through the process of registering your patient and
                tracking their medical progress over time within the application.
              </p>
            </div>
            <div className="col-md-6 col-lg-4">
              <h4 className="text-white font-weight-bold mb-4 mb-lg-5">Get In Touch</h4>
              <input
                className={`form-control mb-4 ${style.input}`}
                type="email"
                placeholder="Enter your email"
              />
            </div>
          </div>
        </div>
      </div>
      <div className={`${style.bottom} py-4`}>
        <div className={style.container}>
          <div className="d-sm-flex align-items-sm-center">
            <div className={`clearfix mb-3 mr-sm-auto ${style.logo}`}>
              <div className={style.logo__letter}>A</div>
              <div className={style.logo__name}>{logo}</div>
              <div className={style.logo__descr}>{description}</div>
            </div>
            <div className="d-flex flex-column flex-sm-row">
              <a className="mb-1 mb-sm-0 px-sm-3" href="#">
                About
              </a>
              <a className="mb-1 mb-sm-0 px-sm-3" href="#">
                Terms of Use
              </a>
              <a className="mb-1 mb-sm-0 px-sm-3" href="#">
                Buy Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default connect(mapStateToProps)(FooterDark)
