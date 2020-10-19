import React from "react";
import { Button } from "@chakra-ui/core";

export const ThemedButton: typeof Button = (props) => {
	return ( 
		<Button 
			colorScheme="purple" 
			color= "white"
			fontWeight="100"
			fontSize="18px"
			{...props}
		> 
			{props.children} 
		</Button> 
	)
}