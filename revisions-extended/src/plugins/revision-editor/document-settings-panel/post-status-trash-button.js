/**
 * External dependencies
 */
import { useState } from 'react';
/**
 * WordPress dependencies
 */
import { dispatch } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { Button } from '@wordpress/components';

const PostStatusTrashButton = ( { onDelete, id } ) => {
	const [ isBusy, setBusy ] = useState( false );

	const deleteUpdate = async () => {
		setBusy( true );
		const { data, error } = await onDelete( id );

		setBusy( false );

		if ( error ) {
			dispatch( 'core/notices' ).createNotice(
				'error',
				__( 'Error deleting update.' ),
				{
					id: 'revisions-extended-delete-notice',
				}
			);
		}

		if ( data ) {
			if ( document.referrer.length > 0 ) {
				window.location.href = document.referrer;
			} else {
				window.location.reload();
			}
		}
	};

	const onTrashClick = () => {
		const message = __(
			'Are you sure you want to delete this update?',
			'revisions-extended'
		);

		// eslint-disable-next-line no-alert
		if ( window.confirm( message ) ) {
			deleteUpdate();
		}
	};

	return (
		<Button
			onClick={ onTrashClick }
			isTertiary
			isDestructive
			isBusy={ isBusy }
		>
			{ __( 'Delete permanently' ) }
		</Button>
	);
};

export default PostStatusTrashButton;
