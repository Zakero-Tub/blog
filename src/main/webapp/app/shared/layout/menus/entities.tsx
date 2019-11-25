import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from './menu-components';

export const EntitiesMenu = props => (
  <NavDropdown icon="th-list" name="Entities" id="entity-menu">
    <MenuItem icon="asterisk" to="/article">
      Article
    </MenuItem>
    <MenuItem icon="asterisk" to="/media">
      Media
    </MenuItem>
    <MenuItem icon="asterisk" to="/tag">
      Tag
    </MenuItem>
    <MenuItem icon="asterisk" to="/review">
      Review
    </MenuItem>
    <MenuItem icon="asterisk" to="/article-question-and-answers">
      Article Question And Answers
    </MenuItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
