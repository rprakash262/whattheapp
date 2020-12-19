import React from 'react';
import EditIcon from '@material-ui/icons/Edit';

import './index.css';
import { getUserCookie } from '../../cookie';

class Modal extends React.Component {
	render() {
		const {
      hideModal,
      changeProfileImgFile,
      submitProfileImgFile,
      uploadingProfileImgFile,
    } = this.props;

    console.log(uploadingProfileImgFile)

    const user = JSON.parse(getUserCookie('user'));

		return (
			<div className="profile-modal-container">
				<div className="profile-modal-overlay" onClick={hideModal} />
				<div className="profile-modal-content">
					<button onClick={hideModal}>X</button>
					<div className="profile-modal-header">
						<p>{user.name} ({user.phone})</p>
					</div>
					<div className="profile-modal-body">
            <div className="profile-modal-profile-img-holder">
              <label for="profileImg" className="profile-modal-edit-icon">
                <EditIcon style={{ color: '#fff' }} />
              </label>
              <div className="profile-modal-profile-img"></div>
            </div>
						<input type="file" id="profileImg" name="profileImg" onChange={changeProfileImgFile} />
						<button onClick={submitProfileImgFile}>Upload</button>
					</div>
					<div className="profile-modal-footer"></div>
				</div>
			</div>
		)
	}
}

export default Modal;
