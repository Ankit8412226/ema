from langchain_openai import AzureChatOpenAI
from langchain_core.messages import HumanMessage, AIMessage, SystemMessage
from langgraph.graph import StateGraph, END
from typing import TypedDict, List, Annotated
import operator
import os

# Define the state
class AgentState(TypedDict):
    messages: Annotated[List[HumanMessage | AIMessage | SystemMessage], operator.add]

# Initialize Azure OpenAI
def get_llm():
    return AzureChatOpenAI(
        azure_deployment=os.getenv("AZURE_OPENAI_DEPLOYMENT_NAME"),
        openai_api_version=os.getenv("AZURE_OPENAI_API_VERSION"),
        azure_endpoint=os.getenv("AZURE_OPENAI_ENDPOINT"),
        api_key=os.getenv("AZURE_OPENAI_API_KEY"),
    )
def call_model(state: AgentState):
    llm = get_llm()
    messages = state['messages']
    
    # Add System Prompt
    system_prompt = SystemMessage(content="""
You are EMA (Enterprise Multi-Agent Assistant), an expert AI insurance adjuster.
Your goal is to assist claims adjusters in processing claims faster and more accurately.

You are helpful, professional, and concise.
You can assist with:
1. Summarizing claim details.
2. Checking policy coverage.
3. Drafting emails to policyholders.
4. Analyzing damage photos.
5. Flagging potential fraud risks.

If the user asks about a claim, provide insightful analysis based on standard insurance practices.
Always maintain a helpful and collaborative tone.
""")
    
    # Prepend system prompt if it's not already there (simple check)
    if not isinstance(messages[0], SystemMessage):
        messages = [system_prompt] + messages
        
    response = llm.invoke(messages)
    return {"messages": [response]}

# Build the graph
def build_graph():
    workflow = StateGraph(AgentState)
    
    workflow.add_node("agent", call_model)
    
    workflow.set_entry_point("agent")
    workflow.add_edge("agent", END)
    
    return workflow.compile()

# Global graph instance
graph = build_graph()

async def get_agent_response(message: str, thread_id: str):
    inputs = {"messages": [HumanMessage(content=message)]}
    config = {"configurable": {"thread_id": thread_id}}
    
    # For this simple prototype, we're just invoking. 
    # In a real app with memory, we'd use the config with a checkpointer.
    # Since we don't have a checkpointer set up in this simple version, 
    # we'll just return the response.
    
    result = await graph.ainvoke(inputs)
    return result["messages"][-1].content
