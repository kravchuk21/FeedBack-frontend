import React from 'react';
import {LoadingState} from '../../store/types';
import SearchUserItem from '../SearchUserItem';
import DialogItemLoader from '../loaders/DialogItemLoader';
import {useAppSelector} from '../../store/hooks';
import {selectSearchData, selectSearchLoadingState} from '../../store/slices/search';

const SearchUserItems = () => {
	const loadingState = useAppSelector(selectSearchLoadingState);
	const searchData = useAppSelector(selectSearchData);

	return (
		<>
			{loadingState === LoadingState.LOADED && searchData && searchData.map(item => (
				<SearchUserItem key={item._id} _id={item._id} email={item.email} fullName={item.fullName}/>
			))}
			{
				loadingState === LoadingState.LOADING && (
					new Array(5).fill(null).map((_, idx) => <DialogItemLoader key={idx}/>)
				)
			}
		</>
	);
};

export default SearchUserItems;
