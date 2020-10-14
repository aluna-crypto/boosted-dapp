import React, { useCallback } from "react";
import { Button } from "@chakra-ui/core";
import theme from "../theme";

export const ThemedButton: React.FC = (props) => {
	return ( 
		<Button 
			colorScheme="purple" 
			variantColor="purple"
			color= "white"
			fontWeight="100"
			fontSize="18px"
			{...props}
		> 
			{props.children} 
		</Button> 
	)
}