import TextField from '@mui/material/TextField';

const UserInfo = ({userData, setUserData}) => {

    return (
            <form className="flex flex-col md:flex-row gap-2 text-dark dark:text-light rounded-md">
                {/* gender picker */}
                <article
                    className="p-2 w-80 md:w-48 flex flex-col justify-between gap-2 bg-accent-light dark:bg-accent rounded-md">
                    <label className="dark:text-dark">Vyberte Vaše pohlaví</label>
                    <div className="flex flex-col gap-2 dark:text-dark">
                        <span>
					        <input type="radio" value="male" name="gender" id="male" defaultChecked
                                   onChange={event => setUserData({...userData, gender: event.target.value})}/>
                            <label className="pl-2">Male</label>
				        </span>
                        <span>
                            <input type="radio" value="female" name="gender" id="female"
                                   onChange={event => setUserData({...userData, gender: event.target.value})}/>
                            <label className="pl-2">Female</label>
				        </span>
                    </div>
                </article>

                {/* weight input */}
                <article
                    className="p-2 w-80 md:w-40 flex flex-col justify-between gap-2 bg-accent-light dark:bg-accent rounded-md">
                    <label className="dark:text-dark">Zadejte Vaši váhu</label>
                    <div className="flex gap-2 items-center">
                        <input className="w-16 p-2 dark:text-light dark:bg-dark dark:placeholder-gray-300 focus:outline-none rounded-md"
                               placeholder="váha"
                               onChange={event => setUserData({...userData, weight: event.target.value})}/>
                        <span className="dark:text-dark">kg</span>
                    </div>
                </article>

                {/* drinking end time input */}
                <article
                    className="p-2 w-80 flex flex-col justify-between gap-2 bg-accent-light dark:bg-accent rounded-md">
                    <label className="dark:text-dark">Kdy jste skončili s konzumací alkoholu?</label>
                    <div className="flex gap-2 items-center">
                        <TextField
                            id="time"
                            type="time"
                            defaultValue="21:30"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputProps={{
                                step: 300, // 5 min
                            }}
                            sx={{ width: "150px" }}
                            onChange={event => setUserData({...userData, time: event.target.value})}
                        />
                    </div>
                </article>
            </form>
    );
}

export default UserInfo;
