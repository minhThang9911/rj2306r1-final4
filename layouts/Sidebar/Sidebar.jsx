import MenuItem from "./MenuItem";
import * as S from "./styles";
function Sidebar({ menuList }) {
    return (
        <S.Container>
            {menuList.map((item, index) => (
                <MenuItem
                    menuItem={item}
                    key={index}
                />
            ))}
        </S.Container>
    );
}

export default Sidebar;
