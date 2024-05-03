import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  CCloseButton,
  CSidebar,
  CSidebarFooter,
  CSidebarHeader,
  CSidebarToggler,
} from '@coreui/react';

import { AppSidebarNav } from './AppSidebarNav';
import navigation from '../_nav';

// Import the logo image
import logo from '../assets/images/image.png';

const AppSidebar = () => {
  const dispatch = useDispatch();
  const unfoldable = useSelector((state) => state.sidebarUnfoldable);
  const sidebarShow = useSelector((state) => state.sidebarShow);

  // Initialize showText based on unfoldable state
  const [showText, setShowText] = useState(!unfoldable);

  useEffect(() => {
    setShowText(!unfoldable);
  }, [unfoldable]);

  return (
    <CSidebar
      className="border-end"
      colorScheme="dark"
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible });
      }}
    >
      <CSidebarHeader className="border-bottom">
        <div className="d-flex align-items-center">
          {sidebarShow && ( // Show logo only when sidebar is visible
            <div className="d-flex align-items-center">
              <img src={logo} alt="Logo" style={{ width: '32px', height: '32px', marginLeft: '5px' }} />
              {showText && <span style={{ marginLeft: '10px' }}>NanaBar Samaj</span>}
            </div>
          )}
        </div>
        <CCloseButton
          className="d-lg-none"
          dark
          onClick={() => dispatch({ type: 'set', sidebarShow: false })}
        />
      </CSidebarHeader>
      <AppSidebarNav items={navigation} />
      <CSidebarFooter className="border-top d-none d-lg-flex">
        <CSidebarToggler
          onClick={() => {
            dispatch({ type: 'set', sidebarUnfoldable: !unfoldable }); // Toggle sidebar visibility
          }}
        />
      </CSidebarFooter>
    </CSidebar>
  );
};

export default React.memo(AppSidebar);