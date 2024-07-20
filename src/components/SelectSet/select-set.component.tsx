import React from 'react';
import { useSetContext } from '../../context/set.context';
import { Dropdown } from 'react-native-element-dropdown';

export default function SelectSet() {
	const { allSets, getSetInfo, currentSet } = useSetContext();

	return (
		<Dropdown
			style={{}}
			data={allSets?.map(({ name, id }) => ({
				label: name,
				value: id,
			}))}
			labelField="label"
			valueField="value"
			onChange={({ value }) => {
				getSetInfo(value);
			}}
			value={currentSet?.id}
			placeholderStyle={{
				color: '#d0d0d0',
			}}
			selectedTextStyle={{
				color: '#f8f8f2',
			}}
		/>
	);
}
