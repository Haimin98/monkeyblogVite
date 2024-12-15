import React, {useEffect, useState} from 'react';
import {doc, getDoc} from "firebase/firestore";
import {db} from "../../firebase/firebase-config.jsx";

const AuthorBox = ({userId = ""}) => {
    const [user, setUser] = useState({});
    useEffect(() => {
        async function fetchUserData() {
            const docRef = doc(db, "users", userId);
            const docSnapshot = await getDoc(docRef);
            if (docSnapshot.data()) {
                setUser(docSnapshot.data());
            }
        }

        fetchUserData();
    }, [userId])
    if (!userId || !user.fullname) return null;
    return (
        <>
            <div className="mt-10 mb-20 flex rounded-[20px] bg-grayF3 ">
                <div className="size-[200px] shrink-0 rounded-[inherit] ">
                    <img
                        className="size-full object-cover rounded-[inherit]"
                        src={user?.avatar}
                        alt=""
                    />
                </div>
                <div className="flex-1 p-5">
                    <h3 className="font-bold mb-3 text-xl">{user?.fullname}</h3>
                    <p className="text-[14px]">
                        {user?.description}
                    </p>
                </div>
            </div>
        </>
    );
};

export default AuthorBox;