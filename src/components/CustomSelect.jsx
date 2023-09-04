import {
  Avatar, Group, Select, Text,
} from '@mantine/core';
import PropTypes from 'prop-types';
import { forwardRef } from 'react';

const SelectItem = forwardRef(({
  image, label, description, ...others
}, ref) => (
  <div ref={ref} {...others}>
    <Group noWrap>
      {image && <Avatar radius="50%" src={image} />}
      <div>
        <Text size="sm">{label}</Text>
        <Text size="xs" opacity={0.65}>
          {description}
        </Text>
      </div>
    </Group>
  </div>
));

SelectItem.displayName = 'SelectItem';

const CustomSelect = ({
  label, placeholder, data, ...props
}) => (
  <Select
    label={label}
    placeholder={placeholder}
    itemComponent={SelectItem}
    data={data}
    withAsterisk={false}
    required
    searchable
    filter={(value, item) => item.label.toLowerCase().includes(value.toLowerCase().trim())
        || item.description.toLowerCase().includes(value.toLowerCase().trim())}
    {...props}
  />
);

const SelectItemPropTypes = {
  image: PropTypes.string,
  label: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

SelectItem.propTypes = SelectItemPropTypes;

SelectItem.defaultProps = {
  image: null,
};

CustomSelect.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape(SelectItemPropTypes)).isRequired,
};

export default CustomSelect;
